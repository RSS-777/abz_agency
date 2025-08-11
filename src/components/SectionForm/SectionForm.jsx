import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styles from './SectionForm.module.scss';
import { Button } from '../Button/Button';
import { getPositions } from '../../api/positionsApi';
import { postUser } from '../../api/usersApi';
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { setSuccess } from '../../store/auth/authSlice';
import { SuccessMessage } from '../SuccessMessage/SuccessMessage';

export const SectionForm = () => {
    const [positions, setPositions] = useState([])
    const [nameFile, setNameFile] = useState('Upload your photo')
    const { register, reset, handleSubmit, watch, formState: { errors, isValid } } = useForm({
        mode: "onChange",
        defaultValues: {
            position: '1'
        }
    })
    const watchFile = watch('upload')
    const inputFileRef = useRef(null)
    const dispatch = useDispatch()
    const isSuccess = useSelector(state => state.auth.isSuccess)

    // Store the name of the selected image file
    useEffect(() => {
        if (watchFile && watchFile.length > 0) {
            const fileName = watchFile[0].name.length > 10
                ? watchFile[0].name.slice(0, 20) + '...' // truncate the name if it's longer than 20 characters;
                : watchFile[0].name;
            setNameFile(fileName);
        } else {
            setNameFile('Upload your photo')
        }
    }, [watchFile]);

    useEffect(() => {
        fetchPosition()
    }, []);

    // Trigger file input click programmatically
    const handleUploadClick = (e) => {
        e.preventDefault()

        inputFileRef.current?.click()
    };

    // Getting positions
    const fetchPosition = async () => {
        const response = await getPositions()

        if (response.success) {
            setPositions(response.positions)
        } // Error handling is done inside the API function (getPositions)
    };

    // Submit form and reset on success
    const onSubmit = async (data) => {
        if (!data) return

        const response = await postUser(data)

        if (response.success) {
            dispatch(setSuccess())
            reset()
            setNameFile('Upload your photo')
        }
    };

    return (
        <section className={styles['section-form']}>
            {isSuccess
                ? (
                    <SuccessMessage />
                ) : (
                    <>
                        <h2 className={styles['section-form__title']} >Working with POST request</h2>
                        <form className={styles['form']} onSubmit={handleSubmit(onSubmit)} id='sign-up'>
                            <div>
                                <label
                                    htmlFor="name"
                                    className={styles['form__label']}
                                >Your name</label>
                                <input
                                    type="text"
                                    id='name'
                                    placeholder='Your name'
                                    className={styles['form__input']}
                                    aria-invalid={errors.name ? "true" : "false"}
                                    {...register('name', {
                                        required: 'Field must not be empty!',
                                        pattern: {
                                            value: /^[a-zA-Zа-яА-ЯёЁЇїІіЄєҐґ\s'-]+$/u,
                                            message: 'Name must contain only letters'
                                        },
                                        minLength: {
                                            value: 2,
                                            message: 'Name must be at least 2 characters'
                                        },
                                        maxLength: {
                                            value: 60,
                                            message: 'Name must be at most 60 characters'
                                        }
                                    })}
                                />
                            </div>
                            <p className={styles['form__error']} role="alert">{errors.name && <span>{errors.name.message}</span>}</p>
                            <div>
                                <label
                                    htmlFor="email"
                                    className={styles['form__label']}
                                >Email</label>
                                <input
                                    type="email"
                                    id='email'
                                    placeholder='Email'
                                    className={styles['form__input']}
                                    aria-invalid={errors.email ? "true" : "false"}
                                    {...register('email', {
                                        required: 'Field must not be empty!',
                                        pattern: {
                                            value: /^(?:[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+(?:\.[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}|(?:\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?!$)|$)){4}\]))$/,
                                            message: 'Enter a valid email address'
                                        }
                                    })}
                                />
                            </div>
                            <p className={styles['form__error']} role="alert">{errors.email && <span>{errors.email.message}</span>}</p>
                            <div>
                                <label
                                    htmlFor="phone"
                                    className={styles['form__label']}
                                >Phone</label>
                                <input
                                    type="tel"
                                    id='phone'
                                    placeholder='Phone'
                                    className={styles['form__input']}
                                    aria-invalid={errors.phone ? "true" : "false"}
                                    {...register('phone', {
                                        required: 'Field must not be empty!',
                                        pattern: {
                                            value: /^\+?380\d{9}$/,
                                            message: '+380XXXXXXXXX'
                                        }
                                    })}
                                />
                            </div>
                            <p className={`${styles['form__error']} ${styles['form__error--phone']}`} role="alert">{errors.phone && <span>{errors.phone.message}</span>}</p>
                            {positions.length > 0 && (
                                <div className={styles['form__position-group']}>
                                    <span className={styles['form__position-title']}>Select your position</span>
                                    {positions?.map(elem => (
                                        <div key={elem.id} className={styles['form__position-item']}>
                                            <input
                                                type="radio"
                                                value={elem.id}
                                                id={`position-input-${elem.id}`}
                                                className={styles['form__position-input']}
                                                {...register('position', { required: true })}
                                            />
                                            <label htmlFor={`position-input-${elem.id}`}>{elem.name} </label>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className={styles['form__upload-group']}>
                                <label
                                    htmlFor="upload"
                                    className={styles['form__label']}
                                >Upload your photo</label>
                                <input
                                    type="file"
                                    id='upload'
                                    placeholder='Upload your photo'
                                    className={`${styles['form__input']} ${styles['form__input--upload']}`}
                                    aria-invalid={errors.upload ? "true" : "false"}
                                    {...register('upload', {
                                        required: 'Please choose a photo!',
                                        validate: {
                                            acceptedFormats: files => {
                                                if (!files || files.length === 0) return 'Please upload a file';
                                                const file = files[0];
                                                const validTypes = ['image/jpeg', 'image/jpg'];
                                                return validTypes.includes(file.type) || 'Only JPG, JPEG  files are allowed';
                                            },
                                            fileSize: files => {
                                                if (!files || files.length === 0) return true;
                                                const file = files[0];
                                                return file.size <= 5 * 1024 * 1024 || 'File size should be less than 5MB';
                                            },
                                            minDimensions: files => {
                                                if (!files || files.length === 0) return true;
                                                const file = files[0];
                                                return new Promise((resolve) => {
                                                    const img = new Image();
                                                    img.onload = () => {
                                                        resolve((img.width >= 70 && img.height >= 70) || 'Minimum image dimensions are 70x70px');
                                                    };
                                                    img.onerror = () => resolve('Invalid image file');
                                                    img.src = URL.createObjectURL(file);
                                                });
                                            }
                                        }
                                    })}
                                    ref={(el) => {
                                        register('upload').ref(el);
                                        inputFileRef.current = el;
                                    }}
                                />
                                <button
                                    type='button'
                                    className={styles['form__upload-button']}
                                    onClick={handleUploadClick}
                                >Upload</button>
                                <p className={styles['form__upload-file']}>{nameFile}</p>
                            </div>
                            <p className={styles['form__error']} role="alert">{errors.upload && <span>{errors.upload.message}</span>}</p>
                            <div className={styles['form__button-wrapper']}>
                                <Button label='Sign up' type='submit' disabled={!isValid} />
                            </div>
                        </form>
                    </>
                )
            }
        </section>
    )
};