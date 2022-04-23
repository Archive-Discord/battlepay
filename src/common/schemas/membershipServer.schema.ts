import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User as UserTypes } from "@types";
import mongoose from "mongoose";
import { Document } from "mongoose";

export type guildMemberShipDocument = Document & guildMemberShip;

@Schema()
export class guildMemberShip {
    @Prop({ type: mongoose.Types.ObjectId})
    _id: string

    @Prop({ type: String, required: true })
    owner_id: string

    @Prop({ type: String, required: true })
    guild_id: string

    @Prop({ type: String, required: true })
    useage: string

    @Prop({ type: String, required: true })
    name: string

    @Prop({ type: Array, required: true })
    benefit: string[]
}

export const guildMemberShipSchema = SchemaFactory.createForClass(guildMemberShip);