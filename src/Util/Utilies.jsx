const selectedOptionTemplate = (option, props) => {
  if (option) {
    return (
      <div className="flex">
        <div>
          {option.id} - {option.name}
        </div>
      </div>
    );
  }

  return <span>{props.placeholder}</span>;
};

const complementoOptionTemplate = (option) => {
  return (
    <div className="flex">
      <div>{option.name}</div>
    </div>
  );
};
