import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User as UserTypes } from "@types";
import mongoose from "mongoose";
import { Document } from "mongoose";

export type UserDocument = Document & UserTypes;

@Schema()
export class userData {
    @Prop({ type: mongoose.Types.ObjectId})
    _id: string

    @Prop({ type: String, required: true })
    id: string

    @Prop({ type: String })
    email: string

    @Prop({ type: String, required: true })
    accessToken: string

    @Prop({ type: String, required: true })
    refreshToken: string

    @Prop({ type: String })
    kakao_accessToken?: string
    
    @Prop({ type: String })
    kakao_refreshToken?: string

    @Prop({ type: String })
    kakao_email?: string

    @Prop({ type: String })
    kakao_name?: string
    google_accessToken?: string
    google_refreshToken?: string

    @Prop({ type: String, required: true })
    token: string

    @Prop({ type: Number, required: true })
    tokenExp: number

    @Prop({ type: Number, required: true })
    expires_in: number

    @Prop({ type: Date, required: true })
    published_date: Date
}

export const UserSchema = SchemaFactory.createForClass(userData);