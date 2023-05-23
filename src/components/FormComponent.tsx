import {
  Box,
  Button,
  FormControl,
  Input,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";

import React, { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addProduct } from "../app/store";

interface FormTypes {
  product_code: string;
  description: string;
  imageURL: string;
}

function FormComponent() {
  const products = useAppSelector((state) => state.productReducer.products);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormTypes>();

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const product = await res.json();
    // const { log } = console;
    console.log(product);
    dispatch(addProduct(product));
    reset({
      product_code: "",
      description: "",
      imageURL: "",
    });
  });

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          marginTop: "40px",
          marginBottom: "20px",
          textAlign: "center",
          color: "gray",
        }}
      >
        Enter Product Details
      </Typography>
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          width: "60%",
          minWidth: "250px",
          margin: "auto",

          marginBottom: "40px",
        }}
      >
        <TextField
          color={errors.product_code ? "error" : "primary"}
          label="product code"
          margin="normal"
          sx={{ width: "60%", minWidth: "230px" }}
          {...register("product_code", {
            required: "required",
            pattern: {
              value: /^[-\d]+$/,
              message: "Only numbers and hyphens are allowed.",
            },
          })}
        />
        {errors.product_code?.message ===
          "Only numbers and hyphens are allowed." && (
          <Typography variant="subtitle2" sx={{ color: "red" }}>
            {errors.product_code?.message}
          </Typography>
        )}
        <TextField
          color={errors.description && "error"}
          label="description"
          margin="normal"
          minRows={2}
          {...register("description", {
            required: "required",
          })}
          sx={{ width: "60%", minWidth: "230px" }}
        />

        <TextField
          color={errors.imageURL && "error"}
          label="imageURl"
          margin="normal"
          {...register("imageURL", {
            required: "required",
          })}
          sx={{ width: "60%", minWidth: "230px" }}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ width: "40%", minWidth: "150px" }}
        >
          Submit
        </Button>
      </form>
    </>
  );
}

export default FormComponent;
