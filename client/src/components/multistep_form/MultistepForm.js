import React, {useEffect, useRef, useState} from 'react';

import useMultistepForm from "./hooks/useMultistepForm";

import CloseButton from "./CloseButton";
import OrderProgress from "./OrderProgress";

export default function MultistepForm({
                                          forms=[],

                                          data={},
                                          setData=f=>f,

                                          errors=[],
                                          setErrors=f=>f,

                                          loading=false,
                                          setLoading=f=>f,

                                          onSubmit=f=>f,
                                          // Непонятно куда перенаправлять при нажатии кнопки закрытия
                                          onClose=f=>f,

                                          // optional
                                          init_step=0,
                                          nextButtonName="Далее",
                                          backButtonName="Назад",
                                          submitButtonName="Отправить"
                                      }) {

    // Ссылка нужна, чтобы перелистывать форму с помощью кнопок
    const submitButtonRef = useRef()

    // formErrors потом должны отображаться как-то.
    // Ошибки назначает каждая отдельная форма.
    // Кажется лучше определить их внешне
    // const [formErrors, setFormErrors] = useState([]);

    /**
     * updateFields(fields) создает копию прошлого объекта data и добавляет новые поля из объекта fields.
     * То есть новый объект - это копия старого объекта с новыми полями, которые мы передадим в аргументах updateFields(fields}).
     *
     * Example:
     * // Now data = { cat: 'meow' };
     *
     * updateFields({ dog: 'woof' });
     * // Now data = { cat: 'meow', dog: 'woof' }
     *
     * updateFields({ cat: 'not meow' });
     * // Now data = { cat: 'not meow', dog: 'woof' }
     * */
    function updateFields(fields){
        setData(prev => ({...prev, ...fields}));
    }


    /**
     * За основную логику перелистывания отвечает хук useMultistepForm.
     * Каждой форме мы передаем все поля из data и updatefields, чтобы форма сама могла назначать значения.
     *
     * Каждая форма независимо выбирает какие поля ей нужны и какие поля назначать, ничто кроме самой формы это не регулирует.
     * Форма может запросить из data любые поля и назначить любые поля.
     *
     * В больших формах нужно следить, чтобы разные формы не пытались использовать одни и те же ключи к полям объекта data.
     *
     * Example:
     * // Now data = { }
     * function Form1({ cat, dog, updateFields, setFormErrors }){
     *     useEffect(()=>{
     *         updateFields({ cat: 'meow' });
     *     }, []);
     * }
     * // Now data = { meow: 'meow' }
     * */
    const {steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo} = useMultistepForm(
        forms.map(form => form({...data, updateFields, setErrors/*, next, back, goTo*/}))
    );


    function onSubmitInside(e){
        e.preventDefault();

        // Если форма добавила ошибки, то мы не можем пройти вперед или submit-нуть, если это последняя форма
        if(errors.length !== 0) {
            return;
        }

        setErrors([]);

        if(!isLastStep){
            return next();
        }

        // Очевидно, функция onSubmit отвечает на то, что делать после того, как у нас готова форма?
        onSubmit();
    }


    /**
     * Слушатели на кнопки еще нужно протестить, потому что они работают напрямую с DOM-ом.
     * */
    function handleKeyDown(e){
        if (e.keyCode === 13) { //'ENTER'
            submitButtonRef.current.click();
        }
        else if(e.keyCode === 27){ //'ESC'
            back();
        }
    }
    useEffect(() => {
        // Не совсем понятно как работать с домом напрямую.
        // Можно указать только на начальный рендер, но там как-то странно работают состояния,
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);


    const [inverted,] = useState(forms.map((form, i) => {
        if(form.isControlPanelOnTop)
            return i;
    }));

    useEffect(()=>{
        // Это нужно, чтобы переключиться в самый конец формы, когда она уже была заполнена ранее.
        if(init_step === -1){
            return goTo(steps.length - 1);
        }

        goTo(init_step)
    }, [])


    return (
        <>
            {/*
                Либо снаружи, либо внутри формы, нужно добавить OrderProgress.
                reverse-column поднимает кнопки вверх. Во-первых, почему называется reverse-column.
                Во-вторых, почему reverse-column находится в className form-ы, а не в диве кнопок?
            */}
            {steps.length > 1 && <OrderProgress n={steps.length} currentStepIndex={currentStepIndex} goTo={goTo}/>}

            {errors.map(error => <p>{error}</p>)}

            <CloseButton onClick={onClose}/>

            <form onSubmit={onSubmitInside} className={`form-workflow ${inverted.includes(currentStepIndex) ? 'reverse-column' : ''}`}>

                <div className="form__body">
                    {step}
                </div>

                {/* Почему здесь на первом шаге идет form-controls-done??? */}
                <div className={`form-controls ${isFirstStep?'form-controls-done':''}`}>

                    {!isFirstStep &&
                    <button type="button" className="btn btn-secondary btn-prev mr-5" onClick={back}>
                        {/*<ArrowRight viewBox="0 0 24 24"/>*/}
                        <span>{backButtonName}</span>
                    </button>
                    }

                    <button ref={submitButtonRef} type="submit" className="btn btn-main btn-next">
                        <span>{isLastStep ? submitButtonName : nextButtonName}</span>
                        {/*<ArrowRight viewBox="0 0 24 24"/>*/}
                    </button>

                </div>

            </form>
        </>
    );
}

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/