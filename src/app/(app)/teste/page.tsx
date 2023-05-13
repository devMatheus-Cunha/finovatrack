import React from 'react';

export default async function TesteComponent() {
  const response = await fetch('http://localhost:3000/api/entrys/getList?id=3gy9V810PwXjVpAABBi8bZN6JkO2', {
    method: 'GET',
  });

  console.log(response);
  return (
    // <h1>{JSON.stringify(data, null, 2)}</h1>
    <h1>oi</h1>
  );
}
