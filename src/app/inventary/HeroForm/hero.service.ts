import { HeroData } from "./CreateHeroRequest"

export class HeroModel {
    constructor() { }

    registerHero = (data: HeroData) => {
        fetch("http://localhost:1802/hero/create", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
    }

    updateHero = (data: HeroData, heroId: string) => {
        fetch(`http://localhost:1802/hero/update/${heroId}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
    }
}