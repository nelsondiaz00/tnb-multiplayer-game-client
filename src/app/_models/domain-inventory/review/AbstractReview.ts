import { Entity } from "../../core/domain/Entity";

export interface ReviewProps {
    playerId: string,
    message: string,
    calification: number
}

export abstract class AbstractReview extends Entity<ReviewProps>{
    constructor(reviewId: string, props: ReviewProps){
        super(reviewId, props)
    }

    get playerId(): string {
        return this.props.playerId;
    }
    
    get message(): string {
        return this.props.message;
    }
    
    get calification(): number {
        return this.props.calification;
    }
    
    abstract isNull(): boolean;
}