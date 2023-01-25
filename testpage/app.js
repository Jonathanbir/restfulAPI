let getData = async () => {
  const response = await fetch("http://localhost:3009/students");
  let data = await response.json();
  console.log(data);
};

getData();
