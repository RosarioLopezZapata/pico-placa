/*
Taking into account the information given in the assignment and after careful searching of information, I ended up
assumming that the restrictions were from Ecuador, that is why then I searched more about this restrictions.
And, according to:
    http://www.quitoinforma.gob.ec/2023/04/10/pico-y-placa-de-1600-a-2000-rige-desde-hoy/#:~:text=Se%20aplica%20de%20lunes%20a,y%20feriados%20no%20hay%20restricci%C3%B3n.

    the time frames restricted are from 6:00 to 9:30 ; and from 16:00 to 20:00
 */
import React, { useState } from "react";
import styles from './Form.module.css'
export function Form() {
    const [input, setInput] = useState({
        licenseplate: '',
        day: '',
        time: ''
    })

    const [errors, setErrors] = useState("");

    function handleChange(e) {// here the info from the user is set as input
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });

        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    }
    function handleSubmit(e) {
        // do not want random errors
        e.preventDefault();
        if (Object.keys(errors).length !== 0) {
            alert('All fields must be filled!')
        }
        else {
            // here the input is treated
            //first, we put the restrictions 
            const restrictions =
            {
                Monday: ['1', '2'],
                Tuesday: ['3', '4'],
                Wednesday: ['5', '6'],
                Thursday: ['7', '8'],
                Friday: ['9', '0'],
            };//day restrictions

            //more restrictions (time)
            const timeMin1 = 6 * 60;
            const timeMax1 = (9 * 60) + 30;
            const timeMin2 = 16 * 60;
            const timeMax2 = 20 * 60;

            //last restriction
            const plate = input.licenseplate;
            let verifiedPlate = '';
            if (plate.length === 7) {
                if (plate[3] === '-') {

                    let letters = plate.substring(0, 3);
                    let digits = plate.substring(4, 7);
                    if (/^[A-Z]+$/.test(letters)) {

                        if (/^\d+$/.test(digits)) {
                            verifiedPlate = plate;
                        }
                    }
                }
            }

            // now we get to treat the info given

            //first we calculate the time given in order to compare if it after

            const times = input.time.split(':').map(time => parseInt(time));
            const time = times[0] * 60 + times[1];

            // we need a licenseplate to verify
            if (verifiedPlate) {
                //seeing if it is in the restriction ranges
                if ((time >= timeMin1 && time <= timeMax1) || (time >= timeMin2 && time <= timeMax2)) {
                    //seeing if it is in the days of the restrictions
                    if (restrictions.hasOwnProperty(input.day)) {
                        let value = restrictions[input.day]

                        const lastD = plate[plate.length - 1];

                        // seeing if the license plate is restricted 
                        if (value.includes(lastD)) {
                            alert('Sorry, you cannot drive in the time and day given!')
                        } else {
                            alert('You can drive in the time and day given!')
                        }
                    } else {
                        alert('You can drive in the time and day given!')
                    }
                } else {
                    alert('You can drive in the time and day given!')
                }

            } else {
                alert('Seems your license plate given is not correct!')
            }

            setInput({
                licenseplate: '',
                day: '',
                time: ''
            })

        }
    }
    return (
        <div className={styles.main}>
            <form onSubmit={(e) => handleSubmit(e)} >
                <div className={styles.inp}>
                    <label>What's your license plate number?:  </label>
                    <input
                        type='text'
                        placeholder='Example: PBX-1234'
                        name='licenseplate'
                        onChange={(e) => handleChange(e)}
                        className={errors.licenseplate}
                    />
                    {
                        errors.licenseplate && (
                            <p className="danger">{errors.licenseplate}</p>
                        )
                    }

                </div>
                <div className={styles.inp}>
                    <label>Which day do you want to drive? :  </label>
                    <select onChange={(e) => handleChange(e)} name="day" className={errors.day}>
                        <option value=''>Op</option>
                        <option value='Monday' >Monday</option>
                        <option value='Tuesday' >Tuesday</option>
                        <option value='Wednesday' >Wednesday</option>
                        <option value='Thursday' >Thursday</option>
                        <option value='Friday' >Friday</option>
                        <option value='Saturday'>Saturday</option>
                        <option value='Sunday'>Sunday</option>
                    </select>
                    {
                        errors.day && (
                            <p className="danger">{errors.day}</p>
                        )
                    }

                </div>

                <div className={styles.inp}>
                    <label> At what time? :  </label>
                    <input type="time"
                        name='time'
                        onChange={(e) => handleChange(e)}
                        className={errors.time}
                    />
                    {
                        errors.time && (
                            <p className="danger">{errors.time}</p>
                        )
                    }

                </div>

                <button type="submit" className={styles.btn}>Find Out!</button>
            </form >




        </div >
    )
}
export function validate(input) {
    let errors = {};
    if (!input.licenseplate) {
        errors.licenseplate = 'Licenseplate is required!';
    }

    if (!input.day) {
        errors.day = 'Day is required!';
    }
    if (!input.time) {
        errors.time = 'Time is required!';
    }
    return errors;
};