import { loginSchema, type LoginFormData } from "@/schemas/authSchema";
import { useLoginEmail } from "@/services";
import { useNotificationContext } from "@/hooks/useNotificationContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function useLogin() {
  const { mutate, isPending } = useLoginEmail();
  const notification = useNotificationContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData, onClose: () => void) => {
    try {
      const request: REQUEST.TLoginEmail = {
        email: data.email,
        password: data.password,
      };

      mutate(request, {
        onSuccess: async (response) => {
          if (response.isSuccess) {
            reset();
            notification.success(
              "Đăng nhập thành công!",
              "Chào mừng bạn quay trở lại."
            );
            onClose();
          }
        },
        onError: (errors: TErrors) => {
          errors.errors.forEach((err) => {
            if (err.code == "AUTH_04") {
              setError("email", { message: "Email hoặc mật khẩu không đúng" });
              setError("password", {
                message: "Email hoặc mật khẩu không đúng",
              });
            }
            if (err.code == "AUTH_09") {
              notification.error(
                "Tài khoản đã đăng nhập",
                "Vui lòng đăng xuất để đăng nhập bằng tài khoản khác."
              );
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
