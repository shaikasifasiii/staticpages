import React from 'react';
import { useFormik } from 'formik';

export const Form = (props) => {
    const formik = useFormik({
        initialValues: {
            region: '',
            country: ''
        },
        onSubmit: values => {
            submitFun(values)
        },
    });
    const submitFun = (values) => {
        props.addLocation(values)
    }
    const rcArray = []
    props.locations.forEach(location => {
        const exists = rcArray.find(x => x.region === location.region)
        if (!exists) {
            rcArray.push({
                region: location.region,
                country: props.locations.filter(x => x.region === location.region)
            })
        }
    })
    const region = rcArray.map(val => <option key={val.region} value={val.region}>{val.region}</option>)
    function getCountry () {
        if (formik.values.region) {
            return rcArray.find(val => val.region === formik.values.region).country.sort((a,b) => a.name.common > b.name.common ? 1: -1).map(val => <option key={val.name.common} value={val.name.common}>{val.name.common}</option>)
        }
        return []
    }
    return (
        <div className="form-container">
            <div className="form-content">
                <h1 className="form-header">ADD A LOCATION</h1>
                <form className="form" onSubmit={formik.handleSubmit}>
                    <select
                        id="region"
                        name="region"
                        type="region"
                        className="form-field"
                        onChange={formik.handleChange}
                        value={formik.values.region}
                    >
                        <option value="">Select Region</option>
                        {
                            region
                        }
                    </select>
                    <select
                        id="country"
                        name="country"
                        type="country"
                        className="form-field"
                        onChange={formik.handleChange}
                        value={formik.values.country}
                    >
                        <option value="">Select Country</option>
                        {
                            getCountry()
                        }
                    </select>

                    <button className="form-submit" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};