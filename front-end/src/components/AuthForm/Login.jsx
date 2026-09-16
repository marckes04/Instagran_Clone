import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import useLogin from "../hooks/useLogin"; // Verifica si en tu proyecto es '../hooks/useLogin' o '../../hooks/useLogin'

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { loading, login } = useLogin();

  const handleLoginSubmit = () => {
    console.log("--> Datos enviados al dar clic en Login:", inputs);
    login(inputs);
  };

  return (
    <>
      <Input
        placeholder="Email"
        fontSize={14}
        size="sm"
        type="email"
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />

      <Input
        placeholder="Password"
        fontSize={14}
        size="sm"
        type="password"
        value={inputs.password}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
      />

      <Button
        w="full"
        colorScheme="blue"
        size="sm"
        fontSize={14}
        isLoading={loading}
        onClick={handleLoginSubmit}
      >
        Log in
      </Button>
    </>
  );
};

export default Login;