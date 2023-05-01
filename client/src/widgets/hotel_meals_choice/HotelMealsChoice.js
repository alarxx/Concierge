import React, {useState} from 'react'
import Card from "../../shared/ui/card/Card";
import CardHeader from "../../shared/ui/card/CardHeader";
import CardBody from "../../shared/ui/card/CardBody";
import CardFooter from "../../shared/ui/card/CardFooter";
import Typography from "../../shared/ui/typography/Typography";
import GroupFlex from "../../shared/ui/group_flex/GroupFlex";
import ButtonLike from "../../shared/ui/button_like/ButtonLike";
import Button from "../../shared/ui/button/Button";
import CheckboxCustom from "../../shared/ui/checkbox_custom/CheckboxCustom";
import RadioCustom from "../../shared/ui/checkbox_custom/RadioCustom";
import TextBoxOutlined from "../../shared/ui/text_box_outlined/TextBoxOutlined";


export default function HotelMealsChoice({address='',rangeAddress=''}) {

    const [tip, setTip] = useState(null);
    const handleChange = (tip) => {
        setTip(tip)
    }

    return(<>
        <Card variant={'info'}>
            <Typography weight={700} size={18} bottom={20} >Питание</Typography>
            <Typography weight={500} size={16} bottom={20} >Выберите тип питания, который вы хотите включить в бронь</Typography>
            <GroupFlex>
                <RadioCustom name={'meals'} label={'BB'} required={true} onChange={() => handleChange('- завтрак включен в стоимость номера завтрак включен в стоимость номера')}/>
                <RadioCustom name={'meals'} label={'HB'} required={true} onChange={() => handleChange('- обед')}/>
                <RadioCustom name={'meals'} label={'BB'} required={true} onChange={() => handleChange('- ужин')}/>
                <RadioCustom name={'meals'} label={'HB'} required={true} onChange={() => handleChange('- все включено')}/>
                <RadioCustom name={'meals'} label={'BB'} required={true} onChange={() => handleChange('- тест')}/>
            </GroupFlex>
            <TextBoxOutlined text={tip} top={20} />
        </Card>
    </>)
}