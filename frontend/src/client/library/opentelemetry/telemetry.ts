/* eslint-disable react-hooks/rules-of-hooks */
import { context, trace, Span, SpanStatusCode } from "@opentelemetry/api";

import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { getWebAutoInstrumentations } from "@opentelemetry/auto-instrumentations-web";
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { ZoneContextManager } from "@opentelemetry/context-zone";
import { B3Propagator } from "@opentelemetry/propagator-b3";
import { Resource } from "@opentelemetry/resources";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { LOCAL_TRACING, TRACING_OTEL_URL } from "@/config/env";
import { useUserFirebase } from "@/client/hooks/useUserStorage";

const userEmail = () => useUserFirebase()?.user?.email ?? 'anon'

const serviceName = "next-client-front";
const resource = new Resource({ "service.name": serviceName });
const provider = new WebTracerProvider({ resource });
const tracer = new OTLPTraceExporter({
  url: TRACING_OTEL_URL,
	headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'X-CSRF': '1',
  },
});
const localTraces = new OTLPTraceExporter({
  url: LOCAL_TRACING,
});
const webTracerWithZone = provider.getTracer(serviceName);

declare const window: any;
var bindingSpan: Span | undefined;

export function initOpenTelemetry() {
  provider.addSpanProcessor(new SimpleSpanProcessor(tracer));
  provider.addSpanProcessor(new SimpleSpanProcessor(localTraces));

  provider.register({
    contextManager: new ZoneContextManager(),
    propagator: new B3Propagator(),
  });

  registerInstrumentations({
    instrumentations: [
      getWebAutoInstrumentations({
        "@opentelemetry/instrumentation-document-load": {
          enabled: false
        },
        "@opentelemetry/instrumentation-xml-http-request": {
          clearTimingResources: true,
        },
        "@opentelemetry/instrumentation-user-interaction": {
          enabled: false
        },
        "@opentelemetry/instrumentation-fetch": {
          enabled: false
        }
      }),
    ],
  });

	window.startBindingSpan = (
		traceId: string,
		spanId: string,
		traceFlags: number
	) => {
		bindingSpan = webTracerWithZone.startSpan("");
		bindingSpan.spanContext().traceId = traceId;
		bindingSpan.spanContext().spanId = spanId;
		bindingSpan.spanContext().traceFlags = traceFlags;
	};
}

export function traceSpan(
  name: string,
  customAttributes?: Record<string, any>
) {
  var singleSpan: Span;
  const baseAttrs = { attributes: {
    'manual-handle': true,
    'x-user': userEmail(),
    ...customAttributes
  }}
  if (bindingSpan) {
    const ctx = trace.setSpan(context.active(), bindingSpan);
    singleSpan = webTracerWithZone.startSpan(name, baseAttrs, ctx);
    bindingSpan = undefined;
  } else {
    singleSpan = webTracerWithZone.startSpan(name, baseAttrs);
  }
  return context.with(trace.setSpan(context.active(), singleSpan), () => {
    try {
      singleSpan.end();
      return customAttributes;
    } catch (error) {
      singleSpan.setStatus({ code: SpanStatusCode.ERROR });
      singleSpan.end();
      throw error;
    }
  });
}