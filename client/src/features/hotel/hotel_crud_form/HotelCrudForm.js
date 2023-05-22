import React, {useEffect, useState} from "react";

import Typography from "../../../shared/ui/typography/Typography";
import Button from "../../../shared/ui/button/Button";
import Block from "../../../shared/ui/block/Block";
import GroupInput from "../../../shared/ui/group_input/GroupInput";
import GroupButtons from "../../../shared/ui/group_buttons/GroupButtons";
import Modal from "../../../shared/ui/modal/Modal";
import Uploader from "../../../shared/uploader/Uploader";

import Input from "../../../shared/ui/input/Input";

function MyInput({
                     placeHolder="Введите значение",
                     name="_",
                     type="text",
                     required=false,
                     data={},
                     upsertFields=f=>f,
                 }){
    return (
        <Input
            name={name}
            placeHolder={placeHolder}
            type={type}
            value={data[name]}
            onChange={e=>upsertFields({[name]: e.target.value})}
            required={required}
        />
    );
}

export default function HotelCrudForm({title='', onClose=f=>f, item=undefined}) {

    const [data, setData] = useState(()=>({}));
    function upsertFields(obj){
        setData((prev)=>({...prev, ...obj}));
    }

    useEffect(()=>{
        upsertFields({images: []});
    }, [])

    async function onSubmit(e) {
        e.preventDefault();

        console.log('HotelCrudForm: hotel create submit', data);

        const formData = new FormData();

        for (let i = 0; i < data.images.length; i++) {
            formData.append(`images.${i}`, data.images[i])
        }

        delete data.images;

        Object.keys(data).map(key => {
            formData.append(key, data[key]);
        })

        const response = await fetch('/api/hotel', {
            method: 'POST',
            body: formData
        });

        onClose();
    }

    function setSelectedImages(selectedFiles){
        upsertFields({
            images: selectedFiles
        })
    }

    return(<>
        <Modal minWidth={720} maxWidth={1000} onClose={onClose}>
            <form onSubmit={onSubmit}>
                <Block bottom={40} isAlignCenter={true}>
                    <Typography weight={700} size={24}>{title}</Typography>
                </Block>

                <Block>
                    <Typography weight={600} size={18}>Общее</Typography>
                    <GroupInput>
                        <MyInput type={'text'} name={'name'} placeHolder={'Название *'} data={data} upsertFields={upsertFields} required/>
                        <MyInput type={'number'} name={'stars'} placeHolder={'Звездность *'} data={data} upsertFields={upsertFields} required/>
                    </GroupInput>
                    <GroupInput>
                        <MyInput type={'text'} name={'phone'} placeHolder={'Номер для связи *'} data={data} upsertFields={upsertFields} required/>
                        {/*<MyInput type={'number'} name={'stars'} placeHolder={'Второй номер'} data={data} upsertFields={upsertFields} required/>*/}
                    </GroupInput>
                </Block>

                <Block top={20}>
                    <Typography weight={600} size={18}>Местоположение</Typography>
                    <GroupInput>
                        <MyInput type={'text'} name={'city'} placeHolder={'Город'} data={data} upsertFields={upsertFields} required/>
                        <MyInput type={'text'} name={'address'} placeHolder={'Адрес'} data={data} upsertFields={upsertFields} required/>
                    </GroupInput>
                    <MyInput type={'text'} name={'2gis_link'} placeHolder={'Ссылка в 2GIS'} data={data} upsertFields={upsertFields} required/>
                    <MyInput type={'text'} name={'description'} placeHolder={'Описание'} data={data} upsertFields={upsertFields} required/>
                </Block>

                <Block top={20}>
                    <Typography weight={600} size={18}>Политика отеля</Typography>
                    <GroupInput>
                        {/*<MyInput type={'text'} name={'name'} placeHolder={'Город'} data={data} upsertFields={upsertFields} required/>*/}
                        {/*<MyInput type={'number'} name={'stars'} placeHolder={'Адрес'} data={data} upsertFields={upsertFields} required/>*/}
                    </GroupInput>
                </Block>

                <Block top={20}>
                    <Typography weight={600} size={18}>Дети</Typography>
                    <GroupInput>
                        {/*<MyInput type={'number'} name={'name'} placeHolder={'Мин возраст'} data={data} upsertFields={upsertFields} required/>*/}
                        {/*<MyInput type={'number'} name={'stars'} placeHolder={'Макс возраст'} data={data} upsertFields={upsertFields} required/>*/}
                    </GroupInput>
                </Block>

                <Block top={20}>
                    <Typography weight={600} size={18}>Цена</Typography>
                    <GroupInput>
                        {/*<MyInput type={'number'} name={'name'} placeHolder={'Цена за день, KZT'} data={data} upsertFields={upsertFields} required/>*/}
                        {/*<MyInput type={'number'} name={'stars'} placeHolder={'Cегмент'} data={data} upsertFields={upsertFields} required/>*/}
                    </GroupInput>
                </Block>

                <Block top={30}>
                    <Uploader setSelectedFiles={setSelectedImages} isMultiple={true}/>
                </Block>


                <GroupButtons top={20}>
                    <Button type={'submit'}>Добавить</Button>
                    <Button variant={'cancel'} onClick={onClose}>Отмена</Button>
                </GroupButtons>
            </form>
        </Modal>
    </>)
}