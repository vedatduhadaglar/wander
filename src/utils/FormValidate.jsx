export const exceedingLimitPopUp = (toast) => {
  toast({
    title: "Slow Down Cowboy",
    description: "Duration can't be more than 7 days.",
    status: "warning",
    duration: 5000,
    isClosable: true,
  });
};

export const validateForm = (toast, searchValue, durationValue) => {
  if (searchValue === "") {
    toast({
      title: "Missing Destination",
      description: "Whoops, you forgot to fill in your destination",
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
    return false;
  }

  if (durationValue === "") {
    toast({
      title: "Missing Duration",
      description: "Don't forget to fill in your travelling duration",
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
    return false;
  }
  return true;
};
