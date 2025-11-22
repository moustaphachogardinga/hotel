import { useParams } from "react-router-dom";
import RoomDetail from "./RoomDetail";

export default function RoomDetailPage() {
const { id } = useParams<{ id: string }>();
if (!id) return <p className="text-center mt-20">ID de chambre manquant</p>;
return <RoomDetail roomId={id} />;
}
