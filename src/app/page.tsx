"use client";

import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Button,
  Box,
  InputLabel,
  Autocomplete,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import the CSS for react-phone-input-2
import InputMask from "react-input-mask"; // Import react-input-mask
import {
  dateValidator,
  handleAutoSelect,
  matchWordStart,
  validateUsPostCode,
} from "@/lib/helper";

// data for the autocomplete fields
import { physicianNamesList } from "@/data/physicians-list";
import { referringProvidersList } from "@/data/referring-providers-list";
const contactMethods = ["Email", "Home Number", "Mobile Number"] as const;
const birthSexOptions = [
  "Male",
  "Female",
  "Other",
  "Prefer Not to Say",
] as const;
import { insuranceCompaniesList } from "@/data/insurance-companies-list";
import { usStatesList } from "@/data/us-states-list";

// Define the Zod schema
const schema = z
  .object({
    physician: z
      .string()
      .min(1, { message: "You must select a valid option for Physician" }),
    referring_provider: z.string().min(1, {
      message: "You must select a valid option for Referring Provider",
    }),
    first_name: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" })
      .max(50, { message: "First name must be at most 50 characters" }),
    middle_name: z.string().optional(),
    last_name: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters" })
      .max(50, { message: "Last name must be at most 50 characters" }),
    mobile_number: z
      .string()
      .min(10, { message: "Mobile number must be valid US number" })
      .optional(),
    home_number: z
      .string()
      .optional()
      .refine((value) => !value || value.length >= 10, {
        message: "Home number must be a valid US number",
      }),
    email: z.string().email({ message: "Invalid email address" }),
    preferred_contact_method: z.enum(contactMethods),
    birth_sex: z.enum(birthSexOptions, {
      errorMap: () => ({
        message: "Invalid option for Birth Sex",
      }),
    }),
    date_of_birth: z
      .string()
      .regex(/^\d{2}-\d{2}-\d{4}$/, {
        message: "Date must be in mm-dd-yyyy format",
      })
      .refine(dateValidator, {
        message: "Invalid date of birth",
      }),
    address_line_1: z
      .string()
      .min(5, { message: "Please enter a valid address" }),
    city: z
      .string()
      .min(2, {
        message: "Enter a valid city name",
      })
      .max(30, {
        message: "Enter a valid city name",
      }),
    state: z.string().min(2, {
      message: "Enter a valid state name",
    }),
    postal_code: z.string().refine(validateUsPostCode, {
      message: "Enter a valid US postal code",
    }),
    primary_insurance_company: z
      .string()
      .min(1, { message: "Invalid Insurance Company" }),
    primary_insurance_member_id: z
      .string()
      .min(5, { message: "Invalid Insurance Member ID" }),
    secondary_insurance_company: z.string().optional(),
    secondary_insurance_member_id: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Check if either mobile_number or home_number is provided
    if (!data.mobile_number && !data.home_number) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Either mobile number or home number must be provided",
        path: ["mobile_number"], // Attach error to mobile_number by default
      });
    }

    // Check if both secondary_insurance_company and secondary_insurance_member_id are filled correctly
    if (
      data.secondary_insurance_member_id &&
      !data.secondary_insurance_company
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Both secondary insurance company and secondary insurance member ID must be provided if one is filled",
        path: ["secondary_insurance_company"], // Attach error to insurance company
      });
    }
  });

// Infer TypeScript types from the schema
type FormData = z.infer<typeof schema>;

export default function ZodForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.1,
        maxWidth: "480px",
        margin: "auto",
        padding: "12px",
        border: "1px solid black",
        borderRadius: 2,
        backgroundColor: "#ffffff",
      }}
    >
      <Controller
        name="physician"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            value={field.value || ""}
            openOnFocus
            clearOnEscape
            options={physicianNamesList}
            filterOptions={(options, state) =>
              handleAutoSelect(
                options.filter((option) =>
                  matchWordStart(option, state.inputValue)
                ),
                field,
                setValue
              )
            }
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                autoFocus
                label="Physician"
                error={!!errors.physician}
                helperText={errors.physician?.message}
              />
            )}
            onChange={(_, value) => field.onChange(value || "")}
          />
        )}
      />

      <Controller
        name="referring_provider"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            value={field.value || ""}
            openOnFocus
            clearOnEscape
            options={referringProvidersList}
            filterOptions={(options, state) =>
              handleAutoSelect(
                options.filter((option) =>
                  matchWordStart(option, state.inputValue)
                ),
                field,
                setValue
              )
            }
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                label="Referring Provider"
                error={!!errors.referring_provider}
                helperText={errors.referring_provider?.message}
              />
            )}
            onChange={(_, value) => field.onChange(value || "")}
          />
        )}
      />

      <TextField
        label="First Name"
        size="small"
        {...register("first_name")}
        error={!!errors.first_name}
        helperText={errors.first_name?.message}
      />
      <TextField
        label="Middle Name"
        size="small"
        {...register("middle_name")}
        error={!!errors.middle_name}
        helperText={errors.middle_name?.message}
      />
      <TextField
        label="Last Name"
        size="small"
        {...register("last_name")}
        error={!!errors.last_name}
        helperText={errors.last_name?.message}
      />

      <div className="flex flex-nowrap justify-between gap-1">
        <div>
          <InputLabel
            sx={{
              fontSize: "14px",
            }}
            htmlFor="mobile_number"
          >
            Mobile Number
          </InputLabel>
          <Controller
            name="mobile_number"
            control={control}
            render={({ field }) => (
              <PhoneInput
                {...field}
                country={"us"}
                onlyCountries={["us"]}
                disableDropdown={true}
                countryCodeEditable={false}
                inputStyle={{
                  width: "100%",
                  height: "40px",
                  borderRadius: "4px",
                  borderColor: errors.mobile_number
                    ? "red"
                    : "rgba(0, 0, 0, 0.23)",
                  paddingLeft: "50px",
                }}
                inputProps={{
                  name: "mobile_number",
                }}
              />
            )}
          />
          {errors.mobile_number && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.mobile_number.message}
            </span>
          )}
        </div>

        <div>
          <InputLabel
            sx={{
              fontSize: "14px",
            }}
            htmlFor="home_number"
          >
            Home Number
          </InputLabel>
          <Controller
            name="home_number"
            control={control}
            render={({ field }) => (
              <PhoneInput
                {...field}
                country={"us"}
                onlyCountries={["us"]}
                disableDropdown={true}
                inputStyle={{
                  width: "100%",
                  height: "40px",
                  borderRadius: "4px",
                  borderColor: errors.home_number
                    ? "red"
                    : "rgba(0, 0, 0, 0.23)",
                  paddingLeft: "50px",
                }}
                inputProps={{
                  name: "home_number",
                  tabIndex: -1,
                }}
              />
            )}
          />
          {errors.home_number && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.home_number.message}
            </span>
          )}
        </div>
      </div>

      <TextField
        label="Email"
        size="small"
        type="email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <Controller
        name="preferred_contact_method"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            value={field.value || ""}
            openOnFocus
            clearOnEscape
            options={contactMethods}
            //@ts-expect-error ....
            filterOptions={(options, state) =>
              handleAutoSelect(
                options.filter((option) =>
                  matchWordStart(option, state.inputValue)
                ),
                field,
                setValue
              )
            }
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                label="Preferred Contact Method"
                error={!!errors.preferred_contact_method}
                helperText={errors.preferred_contact_method?.message}
              />
            )}
            onChange={(_, value) => field.onChange(value || "")}
          />
        )}
      />

      <div className="w-full flex flex-nowrap gap-1 justify-between align-bottom items-start">
        <div className="h-full flex items-end">
          <div>
            <InputLabel sx={{ fontSize: "14px" }} htmlFor="birth_sex">
              Birth Sex
            </InputLabel>
            <Controller
              name="birth_sex"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  value={field.value || ""}
                  openOnFocus
                  clearOnEscape
                  options={birthSexOptions}
                  //@ts-expect-error ....
                  filterOptions={(options, state) =>
                    handleAutoSelect(
                      options.filter((option) =>
                        matchWordStart(option, state.inputValue)
                      ),
                      field,
                      setValue
                    )
                  }
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      sx={{
                        width: "220px",
                      }}
                      error={!!errors.birth_sex}
                      helperText={errors.birth_sex?.message}
                    />
                  )}
                  onChange={(_, value) => field.onChange(value || "")}
                />
              )}
            />
          </div>
        </div>
        <div>
          <InputLabel sx={{ fontSize: "14px" }} htmlFor="date_of_birth">
            Date of Birth
          </InputLabel>
          <Controller
            name="date_of_birth"
            control={control}
            render={({ field }) => (
              <InputMask
                {...field}
                mask="99-99-9999"
                maskChar={null} // No placeholder character
              >
                {
                  //@ts-expect-error ....
                  (inputProps) => (
                    <TextField
                      {...inputProps}
                      placeholder="mm-dd-yyyy"
                      size="small"
                      error={!!errors.date_of_birth}
                      helperText={errors.date_of_birth?.message}
                    />
                  )
                }
              </InputMask>
            )}
          />
        </div>
      </div>

      <TextField
        label="Address Line 1"
        size="small"
        {...register("address_line_1")}
        error={!!errors.address_line_1}
        helperText={errors.address_line_1?.message}
      />

      <div className="flex flex-nowrap justify-between gap-1">
        <TextField
          label="City"
          size="small"
          {...register("city")}
          error={!!errors.city}
          helperText={errors.city?.message}
        />

        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              value={field.value || ""}
              openOnFocus
              clearOnEscape
              options={usStatesList}
              filterOptions={(options, state) =>
                handleAutoSelect(
                  options.filter((option) =>
                    matchWordStart(option, state.inputValue)
                  ),
                  field,
                  setValue
                )
              }
              sx={{ width: "160px" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  sx={{
                    width: "160px",
                  }}
                  label="State"
                  error={!!errors.state}
                  helperText={errors.state?.message}
                />
              )}
              onChange={(_, value) => field.onChange(value || "")}
            />
          )}
        />

        {/* <TextField
          label="State"
          size="small"
          {...register("state")}
          error={!!errors.state}
          helperText={errors.state?.message}
        /> */}

        <TextField
          label="Postal Code"
          size="small"
          {...register("postal_code")}
          error={!!errors.postal_code}
          helperText={errors.postal_code?.message}
        />
      </div>

      <Controller
        name="primary_insurance_company"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            value={field.value || ""}
            openOnFocus
            clearOnEscape
            options={insuranceCompaniesList}
            filterOptions={(options, state) =>
              handleAutoSelect(
                options.filter((option) =>
                  matchWordStart(option, state.inputValue)
                ),
                field,
                setValue
              )
            }
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                label="Primary Insurance Company"
                error={!!errors.primary_insurance_company}
                helperText={errors.primary_insurance_company?.message}
              />
            )}
            onChange={(_, value) => field.onChange(value || "")}
          />
        )}
      />

      <TextField
        label="Primary Insurance Member ID"
        size="small"
        {...register("primary_insurance_member_id")}
        error={!!errors.primary_insurance_member_id}
        helperText={errors.primary_insurance_member_id?.message}
      />

      <Controller
        name="secondary_insurance_company"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            value={field.value || ""}
            openOnFocus
            clearOnEscape
            options={insuranceCompaniesList}
            filterOptions={(options, state) =>
              handleAutoSelect(
                options.filter((option) =>
                  matchWordStart(option, state.inputValue)
                ),
                field,
                setValue
              )
            }
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                label="Secondary Insurance Company"
                error={!!errors.secondary_insurance_company}
                helperText={errors.secondary_insurance_company?.message}
              />
            )}
            onChange={(_, value) => field.onChange(value || "")}
          />
        )}
      />

      <TextField
        label="Secondary Insurance Member ID"
        size="small"
        {...register("secondary_insurance_member_id")}
        error={!!errors.secondary_insurance_member_id}
        helperText={errors.secondary_insurance_member_id?.message}
      />

      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Box>
  );
}
