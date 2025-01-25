function UserImage() {
  const image =
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1448&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="absolute w-48 h-48 rounded-full overflow-hidden border-4 border-white -bottom-0 translate-y-1/2 z-10 left-20 shadow-md shadow-neutral-900/15">
      <img
        className="min-w-full h-full object-cover object-center"
        src={image}
        alt="user image"
      />
    </div>
  );
}

export { UserImage };
