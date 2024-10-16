"use client";

import { Form, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import {
  Autocomplete,
  FormLabel,
  FormControl,
  TextField,
  Input,
  Card,
  Button,
} from "@mui/material";
import { physiciansList } from "@/data/physicians-list";
import { referringProvidersList } from "@/data/referring-providers-list";
import PhoneInputComp from "@/components/phoneInput";

const formSchema = z.object({
  physician: z.string().min(2).max(50),
  referring_provider: z.string().min(2).max(50),
  first_name: z.string().min(2).max(50),
  middle_name: z.string().optional(),
  last_name: z.string().min(2).max(50),
  mobile_number: z.string(),
  home_number: z.string(),
  email: z.string().email(),
  preferred_contact_method: z.string(),
  birth_sex: z
    .enum(["Male", "Female", "Prefer Not to Say", ""])
    .refine((x) => x.length > 1),
  date_of_birth: z.date(),
  address_line_1: z.string(),
  city: z.string(),
  state: z.string(),
  postal_code: z.string(),
  primary_insurance_company: z.string(),
  primary_insurance_member_id: z.string(),
  secondary_insurance_company: z.string(),
  secondary_insurance_member_id: z.string(),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      physician: "",
      referring_provider: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      mobile_number: "",
      home_number: "",
      email: "",
      preferred_contact_method: "",
      birth_sex: "",
      date_of_birth: new Date("12-11-1999"),
      address_line_1: "",
      city: "",
      state: "",
      postal_code: "",
      primary_insurance_company: "",
      primary_insurance_member_id: "",
      secondary_insurance_company: "",
      secondary_insurance_member_id: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Card variant="outlined" className="max-w-lg mx-auto p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="physician"
            render={({ field }) => (
              <FormItem className="flex justify-start items-center gap-2">
                <FormLabel className="w-36">Physician</FormLabel>
                <FormControl {...field}>
                  <Autocomplete
                    size="small"
                    disablePortal // prop to fix the aria-owns issue for iOS Safari
                    options={physiciansList.map((x) => x.name)}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Physician" />
                    )}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="referring_provider"
            render={({ field }) => (
              <FormItem className="flex justify-start items-center gap-2">
                <FormLabel className="w-36">Referring Provider</FormLabel>
                <FormControl {...field}>
                  <Autocomplete
                    size="small"
                    disablePortal // prop to fix the aria-owns issue for iOS Safari
                    options={referringProvidersList}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Referring Provider" />
                    )}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="flex justify-start items-center gap-2">
                <FormLabel className="w-36">First Name</FormLabel>
                <FormControl className="border-1 border-black" {...field}>
                  <TextField
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    size="small"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="middle_name"
            render={({ field }) => (
              <FormItem className="flex justify-start items-center gap-2">
                <FormLabel className="w-36">Middle Name</FormLabel>
                <FormControl className="border-1 border-black" {...field}>
                  <TextField
                    id="outlined-basic"
                    label="Middle Name"
                    variant="outlined"
                    size="small"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="flex justify-start items-center gap-2">
                <FormLabel className="w-36">Last Name</FormLabel>
                <FormControl className="border-1 border-black" {...field}>
                  <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    size="small"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mobile_number"
            render={({ field }) => (
              <FormItem className="flex justify-start items-center gap-2">
                <FormLabel className="w-36">Phone Number</FormLabel>
                <FormControl className="border-1 border-black" {...field}>
                  <PhoneInputComp
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="home_number"
            render={({ field }) => (
              <FormItem className="flex justify-start items-center gap-2">
                <FormLabel className="w-36">Home Number</FormLabel>
                <FormControl className="border-1 border-black" {...field}>
                  <PhoneInputComp
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex justify-start items-center gap-2">
                <FormLabel className="w-36">Email</FormLabel>
                <FormControl className="border-1 border-black" {...field}>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    size="small"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="preferred_contact_method"
            render={({ field }) => (
              <FormItem className="flex justify-start items-center gap-2">
                <FormLabel className="w-36">Preferred Contact Method</FormLabel>
                <FormControl className="border-1 border-black" {...field}>
                  <Autocomplete
                    size="small"
                    disablePortal // prop to fix the aria-owns issue for iOS Safari
                    options={["Mobile Number", "Email", "Home Number"]}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Preferred Contact Method" />
                    )}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birth_sex"
            render={({ field }) => (
              <FormItem className="flex justify-start items-center gap-2">
                <FormLabel className="w-36">Birth Sex</FormLabel>
                <FormControl className="border-1 border-black" {...field}>
                  <Autocomplete
                    size="small"
                    disablePortal // prop to fix the aria-owns issue for iOS Safari
                    options={["Male", "Female", "Prefer Not to Say"]}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Birth Sex" />
                    )}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem className="flex justify-start items-center gap-2">
                <FormLabel className="w-36">Date of Birth</FormLabel>
                <FormControl
                  className="border-1 border-black"
                  fullWidth={true}
                  {...field}
                >
                  <Input type="date" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address_line_1"
            render={({ field }) => (
              <FormItem className="flex justify-start items-center gap-2">
                <FormLabel className="w-36">Address</FormLabel>
                <FormControl {...field}>
                  <TextField
                    id="outlined-basic"
                    label="Address Line 1"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex gap-2 my-4 justify-end">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex justify-start items-center gap-2">
                  <FormControl className="border-1 border-black" {...field}>
                    <TextField
                      id="outlined-basic"
                      label="City"
                      variant="outlined"
                      size="small"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="flex justify-start items-center gap-2">
                  <FormControl className="border-1 border-black" {...field}>
                    <Autocomplete
                      size="small"
                      className="w-40"
                      disablePortal // prop to fix the aria-owns issue for iOS Safari
                      options={["Male", "Female", "Prefer Not to Say"]}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField {...params} label="State" />
                      )}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postal_code"
              render={({ field }) => (
                <FormItem className="flex justify-start items-center gap-2">
                  <FormControl className="border-1 border-black" {...field}>
                    <TextField
                      id="outlined-basic"
                      label="Postal Code"
                      variant="outlined"
                      size="small"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div>Primary Insurance</div>
          <FormField
            control={form.control}
            name="primary_insurance_company"
            render={({ field }) => (
              <FormItem className="flex justify-start items-center gap-2">
                <FormLabel className="w-36">Insurance Company</FormLabel>
                <FormControl className="border-1 border-black" {...field}>
                  <Autocomplete
                    size="small"
                    fullWidth={true}
                    className=""
                    disablePortal // prop to fix the aria-owns issue for iOS Safari
                    options={["Male", "Female", "Prefer Not to Say"]}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Primary Insurance Company"
                        fullWidth={true}
                        className=""
                      />
                    )}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="primary_insurance_member_id"
            render={({ field }) => (
              <FormItem className="flex justify-start items-center gap-2">
                <FormLabel className="w-36">Insurance Member ID</FormLabel>
                <FormControl className="border-1 border-black" {...field}>
                  <TextField
                    id="outlined-basic"
                    label="Primary Insurance Member ID"
                    variant="outlined"
                    size="small"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div>Secondary Insurance</div>
          <FormField
            control={form.control}
            name="secondary_insurance_company"
            render={({ field }) => (
              <FormItem className="flex justify-start items-center gap-2">
                <FormLabel className="w-36">Insurance Company</FormLabel>
                <FormControl className="border-1 border-black" {...field}>
                  <Autocomplete
                    size="small"
                    className=""
                    disablePortal // prop to fix the aria-owns issue for iOS Safari
                    options={["Male", "Female", "Prefer Not to Say"]}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Secondary Insurance Company"
                        className=""
                      />
                    )}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="secondary_insurance_member_id"
            render={({ field }) => (
              <FormItem className="flex justify-start items-center gap-2">
                <FormLabel className="w-36">Insurance Member ID</FormLabel>
                <FormControl className="border-1 border-black" {...field}>
                  <TextField
                    id="outlined-basic"
                    label="Secondary Insurance Member ID"
                    variant="outlined"
                    size="small"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </Card>
  );
}
