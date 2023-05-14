import React from "react";

import Typography from "../../../shared/ui/typography/Typography";
import Button from "../../../shared/ui/button/Button";
import Block from "../../../shared/ui/block/Block";
import Input from "../../../shared/ui/input/Input";
import GroupInput from "../../../shared/ui/group_input/GroupInput";
import GroupButtons from "../../../shared/ui/group_buttons/GroupButtons";

export default function HotelCrudForm({setAction =f=>f, cancelClick, item}) {

    function onSubmit() {
        console.log('hotel create submit')
    }

    return(<>
        <form>
            <Block bottom={40} isAlignCenter={true}>
                <Typography weight={700} size={24}>Добавление отеля</Typography>
            </Block>

            <Block>
                <Typography weight={600} size={18}>Общее</Typography>
                <GroupInput>
                    <Input
                        type={'text'}
                        name={'name'}
                        value={item ? item.name : ''}
                        placeHolder={'Название *'}
                        onChange={f=>f}
                        required
                    />
                    <Input
                        type={'number'}
                        name={'stars'}
                        value={''}
                        placeHolder={'Звездность *'}
                        onChange={f=>f}
                        required
                    />
                </GroupInput>
                <GroupInput>
                    <Input
                        type={'text'}
                        name={'name'}
                        value={''}
                        placeHolder={'Номер для связи *'}
                        onChange={f=>f}
                        required
                    />
                    <Input
                        type={'number'}
                        name={'stars'}
                        value={''}
                        placeHolder={'Второй номер'}
                        onChange={f=>f}
                        required
                    />
                </GroupInput>
            </Block>

            <Block top={20}>
                <Typography weight={600} size={18}>Местоположение</Typography>
                <GroupInput>
                    <Input
                        type={'text'}
                        name={'name'}
                        value={''}
                        placeHolder={'Город'}
                        onChange={f=>f}
                        required
                    />
                    <Input
                        type={'number'}
                        name={'stars'}
                        value={''}
                        placeHolder={'Адрес'}
                        onChange={f=>f}
                        required
                    />
                </GroupInput>
                <Input
                    type={'number'}
                    name={'stars'}
                    value={''}
                    placeHolder={'Ссылка в 2GIS'}
                    onChange={f=>f}
                    required
                />
                <Input
                    type={'number'}
                    name={'stars'}
                    value={''}
                    placeHolder={'Описание'}
                    onChange={f=>f}
                    required
                />
            </Block>

            <Block top={20}>
                <Typography weight={600} size={18}>Политика отеля</Typography>
                <GroupInput>
                    <Input
                        type={'text'}
                        name={'name'}
                        value={''}
                        placeHolder={'Город'}
                        onChange={f=>f}
                        required
                    />
                    <Input
                        type={'number'}
                        name={'stars'}
                        value={''}
                        placeHolder={'Адрес'}
                        onChange={f=>f}
                        required
                    />
                </GroupInput>
            </Block>

            <Block top={20}>
                <Typography weight={600} size={18}>Дети</Typography>
                <GroupInput>
                    <Input
                        type={'number'}
                        name={'name'}
                        value={''}
                        placeHolder={'Мин возраст'}
                        onChange={f=>f}
                        required
                    />
                    <Input
                        type={'number'}
                        name={'stars'}
                        value={''}
                        placeHolder={'Макс возраст'}
                        onChange={f=>f}
                        required
                    />
                </GroupInput>
            </Block>

            <Block top={20}>
                <Typography weight={600} size={18}>Цена</Typography>
                <GroupInput>
                    <Input
                        type={'number'}
                        name={'name'}
                        value={''}
                        placeHolder={'Цена за день, KZT'}
                        onChange={f=>f}
                        required
                    />
                    <Input
                        type={'number'}
                        name={'stars'}
                        value={''}
                        placeHolder={'Cегмент'}
                        onChange={f=>f}
                        required
                    />
                </GroupInput>
            </Block>


            <GroupButtons top={20}>
                <Button type={'submit'} onClick={onSubmit}>Добавить</Button>
                <Button variant={'cancel'} onClick={cancelClick}>Отмена</Button>
            </GroupButtons>
        </form>
    </>)
}