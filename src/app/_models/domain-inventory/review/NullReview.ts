import { AbstractReview, ReviewProps } from "./AbstractReview";

export class NullReview extends AbstractReview {
    static instance: NullReview;
    
    private constructor(reviewId: string, props: ReviewProps){
        super(reviewId, props)
    }

    isNull(): boolean {
        return false;
    }

    public static create(): NullReview {
        if(!NullReview.instance) {
            NullReview.instance = new NullReview(
                "no review id in database",
                {
                    playerId: "-1000",
                    message: "Not message in database",
                    calification: -1000
                }
            );
        }
        return NullReview.instance;
    }
}