import { Button } from "@chakra-ui/react";

type PaginationItemProps = {
  isCurrent?: boolean;
  number: number;
  onPageChange: (page: number) => void;
}

export function PaginationItem({
  isCurrent = false,
  number,
  onPageChange
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size={["sm"]}
        fontSize={["xs"]}
        width={["4"]}
        colorScheme={"purple"}
        disabled
        _disabled={{
          bgColor: "purple.500",
          cursor: "default"
        }}
      >
        {number}
      </Button>
    );
  }

  return (
    <Button
      size={["sm"]}
      fontSize={["xs"]}
      width={["4"]}
      colorScheme={"purple"}
      variant={"outline"}
      _hover={{
        bg: "purple.100"
      }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  );
}