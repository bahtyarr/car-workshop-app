const useDateFormat = () => {
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };

    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return { formatDate };
};

export default useDateFormat;
