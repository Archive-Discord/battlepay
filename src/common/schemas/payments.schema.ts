import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User as UserTypes } from "@types";
import mongoose from "mongoose";
import { Document } from "mongoose";

export type UserPayDocument = Document & userPayData;

@Schema()
export class userPayData {
    @Prop({ type: mongoose.Types.ObjectId})
    _id: string

    @Prop({ type: String, required: true })
    user_id: string

    @Prop({ type: String, required: true })
    access_token: string

    @Prop({ type: String, required: true })
    refresh_token: string
}

export const UserPaySchema = SchemaFactory.createForClass(userPayData);