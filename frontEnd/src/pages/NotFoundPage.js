export function NotFound() {
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <>
      <p>Page not found. Please return back.</p>
      <button onClick={handleGoBack}>Go Back</button>
    </>
  );
}
