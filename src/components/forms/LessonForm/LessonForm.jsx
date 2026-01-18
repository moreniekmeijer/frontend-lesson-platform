import Button from "../../button/Button.jsx";
import {Controller, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../Forms.css";
import useApiRequest from "../../../hooks/useApiRequest.js";
import DatePicker, {registerLocale} from "react-datepicker";
import {nl} from "date-fns/locale";

registerLocale("nl", nl);

function LessonForm({setActiveTab}) {
    const [successId, setSuccessId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedStyles, setSelectedStyles] = useState([]);
    const {register, handleSubmit, control, formState: {errors}} = useForm();
    const [selectedRoles, setSelectedRoles] = useState([]);
    const availableRoles = [
        { label: "Gast", value: "ROLE_GUEST" },
        { label: "Groep 1", value: "ROLE_GROUP_1" },
        { label: "Groep 2", value: "ROLE_GROUP_2" },
    ];

    const {
        data: fetchedStyles = [],
        loading: stylesLoading,
        error: stylesError,
        executeRequest: fetchStyles
    } = useApiRequest([]);

    const {
        executeRequest: postLesson,
        error: postError,
    } = useApiRequest();

    useEffect(() => {
        void fetchStyles("get", `${import.meta.env.VITE_API_URL}/styles`);
    }, []);

    function handleStyleChange(styleName) {
        setSelectedStyles((prevSelected) =>
            prevSelected.includes(styleName)
                ? prevSelected.filter((name) => name !== styleName)
                : [...prevSelected, styleName]
        );
    }

    function handleRoleChange(roleValue) {
        setSelectedRoles(prev =>
            prev.includes(roleValue)
                ? prev.filter(r => r !== roleValue)
                : [...prev, roleValue]
        );
    }

    async function handleFormSubmit(data) {
        setLoading(true);

        const addedData = {
            ...data,
            styleNames: selectedStyles,
            scheduledDateTime: data.scheduledDateTime.toISOString(),
            allowedRoles: selectedRoles,
        };

        try {
            const response = await postLesson("post", `${import.meta.env.VITE_API_URL}/lessons`, addedData);
            setSuccessId(response.data.id);
            setSelectedStyles([]);
            setSelectedRoles([]);
        } catch (e) {
            console.error("Post error:", e);
        }
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <fieldset>
                <label>Datum:</label>
                <Controller
                    name="scheduledDateTime"
                    control={control}
                    rules={{required: "Datum is verplicht"}}
                    render={({field}) => (
                        <DatePicker
                            selected={field.value}
                            onChange={(date) => {
                                if (date) {
                                    date.setHours(12, 0, 0, 0);
                                }
                                field.onChange(date);
                            }}
                            dateFormat="dd-MM-yyyy"
                            locale="nl"
                            inline
                            minDate={new Date()}
                            calendarStartDay={1}
                            showMonthYearDropdown={false}
                        />
                    )}
                />
                {errors.scheduledDateTime && (
                    <p className="errorMessage">{errors.scheduledDateTime.message}</p>
                )}
            </fieldset>

            <fieldset>
                <label>Kies stijlen:</label>
                {stylesLoading ? (
                    <p>Bezig met laden...</p>
                ) : fetchedStyles.length === 0 ? (
                    <p>
                        Geen stijlen beschikbaar!
                        <Button variant="secondary" onClick={() => setActiveTab('style')}>
                            Wil je stijlen toevoegen?
                        </Button>
                    </p>
                ) : (
                    <div className="checkboxContainer">
                        {fetchedStyles.map((style) => (
                            <label key={style.id}>
                                <input
                                    type="checkbox"
                                    value={style.name}
                                    checked={selectedStyles.includes(style.name)}
                                    onChange={() => handleStyleChange(style.name)}
                                />
                                {style.name}
                            </label>
                        ))}
                    </div>
                )}

                <label>Kies doelgroepen:</label>
                <div className="checkboxContainer">
                    {availableRoles.map(role => (
                        <label key={role.value}>
                            <input
                                type="checkbox"
                                value={role.value}
                                checked={selectedRoles.includes(role.value)}
                                onChange={() => handleRoleChange(role.value)}
                            />
                            {role.label}
                        </label>
                    ))}
                </div>

                <label htmlFor="notes">Notities:</label>
                <textarea
                    id="notes"
                    rows="5"
                    cols="30"
                    className={errors.notes ? "inputError" : ""}
                    {...register("notes", {
                        maxLength: {
                            value: 2000,
                            message: "Input mag maximaal 2000 karakters bevatten",
                        },
                    })}
                />
                {errors.notes && <p className="errorMessage">{errors.notes.message}</p>}

                <Button type="submit" disabled={loading}>Opslaan</Button>
                {loading && <p>Les aan het opslaan...</p>}
                {successId && <p>De Les is klaargezet!</p>}
                {(stylesError || postError) && <p>Er is iets misgegaan. Heb je een stijl en doelgroep aangevinkt?</p>}
            </fieldset>
        </form>
    );
}

export default LessonForm;
