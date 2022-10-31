import toast from "~/core/util/toast";

namespace ErrorHandlingService {
  export function handleErrorSilently(e: Error) {
    console.error(e);
  }

  export function notifyUserOfError(e: Error, title: string) {
    handleErrorSilently(e);

    toast({
      title: title,
      description: (e as Error).message,
      status: "error",
      isClosable: true,
    });
  }
}

export default ErrorHandlingService;
