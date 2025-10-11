import { registerSchema, type RegisterFormData } from "@/schemas/authSchema";
import { useRegisterEmail } from "@/services";
import { useNotificationContext } from "@/hooks/useNotificationContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function useRegister() {
  const { mutate, isPending } = useRegisterEmail();
  const notification = useNotificationContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      displayName: "",
    },
  });

  const onSubmit = async (data: RegisterFormData, action: () => void) => {
    try {
      const request: REQUEST.TRegisterEmail = {
        displayName: data.displayName,
        email: data.email,
        password: data.password,
      };

      mutate(request, {
        onSuccess: async (response) => {
          if (response.isSuccess) {
            reset();
            notification.success(
              "Đăng ký thành công!",
              "Tài khoản của bạn đã được tạo."
            );
            action();
          }
        },
        onError: (errors: TErrors) => {
          errors.errors.forEach((err) => {
            if (err.code == "AUTH_02") {
              setError("email", { message: "Email đã tồn tại" });
            }
            if (err.code == "AUTH_03") {
              setError("displayName", { message: "Tên hiển thị đã tồn tại" });
            }
          });
        },
      });
    } catch {
      notification.error("Lỗi không xác định", "Vui lòng thử lại sau.");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    setValue,
    setError,
    isPending,
  };
}
