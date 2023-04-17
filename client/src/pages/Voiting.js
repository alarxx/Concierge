import React from 'react';

import Menu from "../components/ui/Menu";
import Layout from "../components/layouts/Layout";

import Card from "../components/ui/Card"
import Modal from "../components/ui/Modal"

export default function Voiting({}){

    let voitingItems = [
        {
            id: 1,
            title: "Голосование за книгу мессяца",
            category: "",
            start_date: "",
            end_date: "",
            details: "",
            author_id: "",
            countVotes: 10
        }        
    ]

    const [selectedItem, setItem] = React.useState(null);
    const handleClick = (item) => {
        console.log("click")
        setItem(item);
    };

    return (
        <Layout>
            {/* Render the modal */}
            {selectedItem !== null && (
                <Modal
                    data = {selectedItem}
                    onClose={() => setItem(null)}
                />
            )}
            <div className="section section-voiting">
                <div className="cards">
                    {voitingItems.map( (voitingItem) => (
                        <Card data = {voitingItem} key={voitingItem.id} onClick={() => handleClick(voitingItem)} />
                    )) }
                </div>
            </div>
        </Layout>
    )
}