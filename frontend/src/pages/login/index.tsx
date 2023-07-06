import {
  Text,
  Paper,
  Group,
  PaperProps,
  Container,
  Center,
} from "@mantine/core";
import { GoogleButton } from "@clientui/components/SocialButtons/SocialButtons";
import { useLogin } from "@clienthooks/useAuth";
import { userStore } from "@clientstore/user";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LOGIN_ERRORS } from "@/constants/auth.constants";
import { notifications } from '@mantine/notifications';
import { ROUTES } from "@/constants/routes.contants";
import { trace } from '@opentelemetry/api'
import { traceSpan } from "@clientlibrary/opentelemetry/telemetry";

const loginTrace = trace.getTracer('login-page')
const parentSpan = loginTrace.startSpan('login')

export default function Login(props: PaperProps) {
  const { setUser } = userStore();
  const { login, loading, error, user: firebaseUser } = useLogin();
  const router = useRouter();

  const loginHandle = () => {
    traceSpan('login-click-botao-login', { customData: '1234' })
    login()
  }

  useEffect(() => {
    if (error) {
      if(error.code !== LOGIN_ERRORS.USER_CLOSE_POPUP){
        traceSpan('usuario-cancelou-login')
        return
      }
      traceSpan('login-com-error-desconhecido')
      notifications.show({
        title: 'Ops!',
        color: 'red',
        message: 'Não possivel realizar, login agora! Já tente em alguns minutos. 🤥',
      })
    }

    if (!!firebaseUser) {
      const {
        user: { email, displayName, photoURL },
      } = firebaseUser;
      traceSpan('login-sucesso')
      setUser({
        displayName: String(displayName),
        email: String(email),
        photoURL: String(photoURL),
      });

      traceSpan('redirect-para-home')
      parentSpan.end();
      router.push(ROUTES.HOME)
    }
  }, [firebaseUser, error, router]);

  useEffect(() => {
    localStorage.clear();
    traceSpan('limpar-credenciais-antigas', { now: new Date().toString() })
  }, []);

  return (
    <Container>
      <Center maw={400} h="100vh" mx="auto">
        <Paper radius="md" p="xl" withBorder {...props}>
          <Text size="lg" weight={500}>
            Welcome to App, login with
          </Text>

          <Group grow mb="md" mt="md">
            <GoogleButton loading={loading} onClick={loginHandle} radius="xl">
              Google
            </GoogleButton>
          </Group>
        </Paper>
      </Center>
    </Container>
  );
}
