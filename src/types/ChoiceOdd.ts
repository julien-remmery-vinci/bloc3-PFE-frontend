export interface ChoiceOdd {
    choice_id: number;
    choice: 
        | "Ne correspond pas à mes activités"
        | "Pas de contribution"
        | "Contribution occasionnelle"
        | "Contribution générale"
        | "Contribution spécifique"
        | "Mission d'entreprise";
    score: number;
}
