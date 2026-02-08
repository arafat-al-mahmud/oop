import { InvalidRatingError, MovieNotWatchedError } from "./errors.js";

export class Movie {
    private readonly id: string;
    private title: string;
    private watched: boolean = false;
    private totalRating: number = 0;
    private ratingCount: number = 0;
    private avgRating: number | null = null;

    constructor(id: string, title: string) {
        this.id = id;
        this.title = title;
    }

    public watch() {
        this.watched = true;
    }

    public rate(n: number) {
        if (!this.watched) {
            throw new MovieNotWatchedError();
        }

        if (n < 1 || n > 5) {
            throw new InvalidRatingError();
        }

        this.totalRating += n;
        this.ratingCount++;
        this.avgRating = this.totalRating / this.ratingCount;
    }

    public getAverageRating() {
        return this.avgRating;
    }
}