import { Input } from "@chakra-ui/react";
import { useState } from "react";

const Signup = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    fullName: "",
    username: "",
  });
  return (
    <>
      <Input
        placeholder="Email"
        fontSize={14}
        type="email"
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />

      <Input
        placeholder="Password"
        fontSize={14}
        type="password"
        value={inputs.password}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
      />

       <Input
        placeholder="Full Name"
        fontSize={14}
        type="text"
        value={inputs.fullName}
        onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
      />

      <Input
        placeholder="User Name"
        fontSize={14}
        type="text"
        value={inputs.username}
        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
      />

      <Button w={"full"} colorScheme={"blue"} size={"sm"} fontSize={14}>
        Log in
      </Button>
    </>
  );
};

export default Signup;
