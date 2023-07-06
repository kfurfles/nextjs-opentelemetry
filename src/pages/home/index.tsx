import { withPrivatePage } from "@client/containers/protected.route";
import { User } from "@/interface/user.interface";
import { userStore } from "@clientstore/user";
import {
  Text,
  Paper,
  PaperProps,
  Container,
  Center,
  Divider,
  Button,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { traceSpan } from "@/client/library/opentelemetry/telemetry";
import { useRouter } from "next/router";

function Login(props: PaperProps) {
  const { email, photoURL, displayName } = userStore();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    setUser({
      displayName,
      email,
      photoURL,
    });
  }, [email, photoURL, displayName]);

  useEffect(() => {
    traceSpan("home-screen", () => ({ email, photoURL, displayName }));
  }, [email, photoURL, displayName]);

  return (
    <Container>
      <Center maw={400} h="100vh" mx="auto">
        <Paper radius="md" p="xl" withBorder {...props}>
          <Text size="lg" weight={500}>
            Protected Route: {user?.email} || {user?.displayName}
          </Text>
          <Divider my="lg" />
          <Button onClick={() => router.push('/logout')} fullWidth>Logout</Button>
        </Paper>
      </Center>
    </Container>
  );
}

export default withPrivatePage(Login);
