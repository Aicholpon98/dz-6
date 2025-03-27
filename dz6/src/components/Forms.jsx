import React, { useState } from "react";

function Forms() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [data, setData] = useState([]);
    const [errors, setErrors] = useState({});

    function submit(event) {
        event.preventDefault();

        const newErrors = {};

        if (!name) newErrors.name = "Это поле обязательно";
        if (!surname) newErrors.surname = "Это поле обязательно";


        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }


        setData([...data, { name, surname }]);
        setName("");
        setSurname("");
        setErrors({});
    }

    const deleteFunc = (index) => {
        setData(data.filter((_, i) => i !== index));
    };


    const handleClearAll = () => {
        setData([]);
    };


    function Button({ type = "button", onClick, className, children }) {
        return (
            <button type={type} onClick={onClick} className={className}>
                {children}
            </button>
        );
    }

    function InputField({ value, setValue, name, placeholder, error }) {
        return (
            <div>
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="input-field"
                />
                {error && <span style={{ color: "red" }}>{error}</span>}
            </div>
        );
    }

    function UserRow({ user, index, onDelete }) {
        return (
            <div style={{ display: "flex", gap: "20px", justifyContent: "center", textAlign: "center" }}>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Username:</strong> {user.surname}</p>
                <Button onClick={() => onDelete(index)} className="danger">Удалить</Button>
            </div>
        );
    }

    function UserTable({ data, onDelete }) {
        return (
            <div className="table">
                {data.length === 0 ? (
                    <p>Таблица пуста</p>
                ) : (
                    data.map((user, index) => (
                        <UserRow key={index} user={user} index={index} onDelete={onDelete} />
                    ))
                )}
            </div>
        );
    }

    return (
        <div>
            <form onSubmit={submit}>
                <InputField
                    value={name}
                    setValue={setName}
                    name="name"
                    placeholder="Name"
                    error={errors.name}
                />
                <InputField
                    value={surname}
                    setValue={setSurname}
                    name="surname"
                    placeholder="Surname"
                    error={errors.surname}
                />
                <Button type="submit" className="primary">Создать</Button>
                <Button onClick={handleClearAll} className="secondary">Очистить таблицу</Button>
            </form>

            <UserTable data={data} onDelete={deleteFunc} />
        </div>
    );
}

export default Forms;



