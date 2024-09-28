import { AbstractReview, ReviewProps } from "./AbstractReview";

export class Review extends AbstractReview {

    private constructor(reviewId: string, props: ReviewProps) {
        super(reviewId, props)
    }

    public static create(
        reviewId: string,
        playerId: string,
        message: string,
        calification: number
    ): AbstractReview {
        return new Review(reviewId, { playerId, message, calification })
    }

    isNull(): boolean {
        return false;
    }
}