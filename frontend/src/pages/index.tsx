import { withPrivatePage } from "@client/containers/protected.route";
import { Text, Paper, PaperProps, Container, Center } from "@mantine/core";
import { useEffect } from "react";
import { useRouter } from "next/router";

function Login(props: PaperProps) {
  const router = useRouter();

  useEffect(() => {
    router.push("/login")
  }, []);

  return (
    <Container>
      <Center maw={400} h="100vh" mx="auto">
        <Paper radius="md" p="xl" withBorder {...props}>
          <Text size="lg" weight={500}>
            Redirecionando ...
          </Text>
        </Paper>
      </Center>
    </Container>
  );
}

export default withPrivatePage(Login);
