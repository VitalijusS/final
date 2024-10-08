import { useState } from "react";

export function NewLocationForm() {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [img, setImg] = useState('');
    const [imgError, setImgError] = useState('');
    const [country, setCountry] = useState('');
    const [countryError, setCountryError] = useState('');
    const [city, setCity] = useState('');
    const [cityError, setCityError] = useState('');

    const [isFormValidated, setIsFormValidated] = useState(false);
    const [apiResponse, setApiResponse] = useState(null);

    function isValid(str) {
        return typeof str === 'string' && str.trim().length > 0;
    }

    function submitForm(e) {
        e.preventDefault();

        setIsFormValidated(true);

        setNameError(isValid(name) ? '' : 'Need location name');
        setImgError(isValid(img) ? '' : 'Need image');
        setCountryError(isValid(country) ? '' : 'Need country name');
        setCityError(isValid(city) ? '' : 'Need city name');

        if (!nameError && !imgError && !countryError && !cityError) {
            fetch('http://localhost:5020/api/locations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    img,
                    country,
                    city,
                }),
            })
                .then(res => res.json())
                .then(data => setApiResponse(data))
                .catch(err => console.error(err));
        }
    }

    return (
        <main className="form-signin container">
            <div className="row">
                <form onSubmit={submitForm} className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                    <h1 className="h3 mb-3 fw-normal">New location</h1>

                    {apiResponse && apiResponse.status === 'success' ? <p className="alert alert-success">{apiResponse.message}</p> : null}
                    {apiResponse && apiResponse.status === 'error' ? <p className="alert alert-danger">{apiResponse.message}</p> : null}


                    <div className="form-floating">
                        <input value={name} onChange={e => setName(e.target.value.trim())}
                            type="text" id="name" placeholder="Nemunas"
                            className={'form-control ' + (isFormValidated ? nameError ? 'is-invalid' : 'is-valid' : '')} />
                        <label htmlFor="name">Location name</label>
                        {nameError && <p className="invalid-feedback">{nameError}</p>}
                    </div>

                    <div className="form-floating">
                        <input value={img} onChange={e => setImg(e.target.value.trim())}
                            type="text" id="img" placeholder="Image"
                            className={'form-control ' + (isFormValidated ? imgError ? 'is-invalid' : 'is-valid' : '')} />
                        <label htmlFor="img">Photo</label>
                        {imgError && <p className="invalid-feedback">{imgError}</p>}
                    </div>

                    <div className="form-floating">
                        <input value={country} onChange={e => setCountry(e.target.value.trim())}
                            type="text" id="country" placeholder="Image"
                            className={'form-control ' + (isFormValidated ? countryError ? 'is-invalid' : 'is-valid' : '')} />
                        <label htmlFor="country">Country</label>
                        {countryError && <p className="invalid-feedback">{countryError}</p>}
                    </div>

                    <div className="form-floating">
                        <input value={city} onChange={e => setCity(e.target.value.trim())}
                            type="text" id="city" placeholder="Image"
                            className={'form-control ' + (isFormValidated ? cityError ? 'is-invalid' : 'is-valid' : '')} />
                        <label htmlFor="city">City</label>
                        {cityError && <p className="invalid-feedback">{cityError}</p>}
                    </div>

                    {/* street */}
                    {/* number */}
                    {/* zip */}

                    <button className="btn btn-primary w-100 py-2 mt-3" type="submit">Add</button>
                </form>
            </div>
        </main>
    );
}