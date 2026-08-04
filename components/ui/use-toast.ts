export function useToast() {
  return {
    toast: ({ description }: { description: string }) => {
      alert(description);
    },
  };
}