import { Button, FormControl, Input, TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface FormTypes {
  code: string;
  description: string;
  imageURL: string;
}

function FormComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypes>();

  const [er, setEr] = useState<string>("");

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <Input
          {...register("code", {
            required: "required",
            pattern: {
              value: /^[-\d]+$/,
              message: "'Only numbers and hyphens are allowed.'",
            },
          })}
          placeholder="product code"
        />
        {errors.code ? <p>{errors.code.message}</p> : ""}
        <TextareaAutosize
          minRows={2}
          {...(register("description"), { required: true })}
          placeholder="description"
        />
        {errors.description && <p>{errors.description?.message}</p>}
        <Input
          {...(register("imageURL"), { required: true })}
          placeholder="image URL"
        />
        {/* {<p>{errors.imageURL?.message}</p>} */}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default FormComponent;
