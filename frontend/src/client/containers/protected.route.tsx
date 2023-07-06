import { userStore } from "@client/store/user";
import { useRouter } from "next/router";
import { ReactNode, useEffect, Component } from "react";

interface Props {
  children: ReactNode;
}

export function withPrivatePage<T extends Props = Props>(
  WrappedComponent: React.ComponentType<T>
) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  const ComponentWithTheme = (props: Omit<T, keyof Props>) => {
    const user = userStore();
    const router = useRouter();

    useEffect(() => {
      if (!user.isLogged) {
        router.push("/login");
      }
    }, [user, router]);

    return <WrappedComponent {...(props as T)} />;
  };

  ComponentWithTheme.displayName = `withPrivatePage(${displayName})`;

  return ComponentWithTheme;
}
