import React from "react"

export default function Tabs() {
    return (
        <div className="tabs">
            <ul className="tab dflex aic">
                <li className="tab__li tab__li-active"><a href="frontend/src/pages#" data-tab="managers">Менеджеры</a></li>
                <li className="tab__li"><a href="frontend/src/pages#" data-tab="b2b">B2B клиенты</a></li>
                <li className="tab__li"><a href="frontend/src/pages#" data-tab="b2c">B2С клиенты</a></li>
            </ul>
        </div>
    )
}
