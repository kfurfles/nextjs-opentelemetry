import { withPrivatePage } from "@client/containers/protected.route";
import { Text, Paper, PaperProps, Container, Center } from "@mantine/core";
import { useEffect } from "react";
import { useLogout } from "@/client/hooks/useAuth";
import { useRouter } from "next/router";

function Login(props: PaperProps) {
  const router = useRouter();

  const { logout } = useLogout();

  useEffect(() => {
    setTimeout(() => {
      logout().then(() => router.push("/login"));
    }, 3000);
  }, []);

  return (
    <Container>
      <Center maw={400} h="100vh" mx="auto">
        <Paper radius="md" p="xl" withBorder {...props}>
          <Text size="lg" weight={500}>
            Saindo ...
          </Text>
        </Paper>
      </Center>
    </Container>
  );
}

export default withPrivatePage(Login);
