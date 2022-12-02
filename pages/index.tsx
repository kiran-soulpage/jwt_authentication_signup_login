const RegisterModal = () => {
  const fields = ["name", "email"];
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const values: any = {};
    fields.map((el: any) => (values[el] = e.target[`${el}`].value));
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column g-1">
      {fields.map((e: any, id: any) => (
        <input
          name={e}
          placeholder={e}
          className="form-control"
          autoFocus={id === 0}
          required={true}
        />
      ))}

      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default RegisterModal;
