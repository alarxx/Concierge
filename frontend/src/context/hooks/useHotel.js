import React, {useEffect, useState} from 'react'



/**
 * Должен предоставлять все функции для загрузки всех отелей, создания нового, удаления, изменения,
 * */
export default function useHotel(){

    async function createHotel(hotel){
        // Убеждаемся, что пользователь авторизован и создаем заказ
        try{
            const res = await fetch('/api/hotel', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(hotel)
            });
            const json = await res.json();
            console.log(json);
        }catch(e){
            console.log(e);
        }
    }

    async function updateHotel(order){
        try{
            const res = await fetch('/api/hotel', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(order)
            });
            const json = await res.json();
            console.log(json);
        }catch(e){
            console.log(e);
        }
    }

    async function deleteHotel(order){
        try{
            const res = await fetch('/api/hotel', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(order)
            });
            const json = await res.json();
            console.log(json);
        }catch(e){
            console.log(e);
        }
    }

    /** функция должна вызываться в начале приложения, а дальше по просьбе user-а или при изменении user-a подгружать отели. Хз */
    async function searchHotels(query){
        try{
            const res = await fetch("/api/hotel?" + new URLSearchParams(query));
            const json = await res.json();
            console.log(json);
        }catch(e){
            console.log(e);
        }
    }

    async function getHotel(id){
        try{
            const res = await fetch(`/api/hotel/${id}`);
            const json = await res.json();
            console.log(json);
        }catch(e){
            console.log(e);
        }
    }


    return {createHotel, updateHotel, deleteHotel, searchHotels, getHotel};
}