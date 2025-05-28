import {
    Card,
    CardBody,
    Typography,
    Button,
    IconButton,
    Input,
} from "@material-tailwind/react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { $api } from "../../utils";
import CreateExpenses from "./components/CreateExpenses";
import DeleteExpenses from "./components/DeleteExpenses";
import EditExpenses from "./components/EditExpenses";
import ReactLoading from 'react-loading';


function getCurrentMonthRange() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-based


    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Форматируем в YYYY-MM-DD
    const formatDate = (date) =>
        date.toISOString().split("T")[0];

    return {
        start: formatDate(firstDay),
        end: formatDate(lastDay),
    };
}

export default function Expenses() {
    const { start, end } = getCurrentMonthRange();
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteData, setDeleteData] = useState(null)
    const [startDate, setStartDate] = useState(start);
    const [endDate, setEndDate] = useState(end);
    const [expenses, setExpenses] = useState([]);
    const [editData, setEditData] = useState(null)
    const [editModal, setEditModal] = useState(false)
    const [loading, setLoading] = useState(true)

    const getExpenses = async () => {
        setLoading(true)
        try {
            const response = await $api.get(`expenses/filter`, {
                params: {
                    start_date: startDate,
                    end_date: endDate,
                },
            });

            if (response?.data) {
                setExpenses(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getExpenses();
    }, [startDate, endDate]);

    // Убрана дополнительная фильтрация, так как данные уже отфильтрованы на сервере
    const totalAmount = expenses.reduce(
        (sum, item) => sum + parseFloat(item.price), // Используем price вместо amount
        0
    );

    if (loading) {
        return (
            <div className="mx-auto pb-24 min-h-screen p-4">
                <div className="mb-6 p-4 bg-white h-[100%] rounded-lg shadow  ">
                    <div className="flex items-center justify-center h-screen ">
                        <ReactLoading type="spinningBubbles" color="black" height={80} width={80} />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6 pt-[80px]">
            {/* Заголовок + кнопка */}
            <div className="flex items-center justify-between mb-6">
                <Typography variant="h4" color="blue-gray" className="font-bold">
                    Xarajatlar
                </Typography>
                <CreateExpenses refresh={getExpenses} />
            </div>

            <Card className="w-full mb-6 shadow-md">
                <div className="flex items-center w-full gap-[10px] p-[10px]">
                    <Input
                        type="date"
                        label="Boshlanish"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="flex-1 w-full"
                    />
                    <Input
                        type="date"
                        label="Tugash"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="flex-1 w-full"
                    />
                    <Button onClick={getExpenses} className="w-[30%]">
                        Filter
                    </Button>
                </div>
            </Card>

            {/* Общая сумма */}
            <Card className="w-full shadow-sm mb-6">
                <CardBody className="flex justify-between items-center">
                    <Typography variant="h6" color="blue-gray">
                        Umumiy xarajatlar:
                    </Typography>
                    <Typography variant="h5" color="blue" className="font-semibold">
                        {totalAmount.toLocaleString()} UZS
                    </Typography>
                </CardBody>
            </Card>

            {/* Карточки расходов */}
            <div className="flex flex-col gap-4 mb-6">
                {expenses.map(({ id, name, price, date }) => (
                    <Card key={id} className="w-full shadow-md hover:shadow-lg transition">
                        <CardBody className="flex justify-between items-center">
                            <div>
                                <Typography variant="h6" color="blue-gray" className="mb-1">
                                    {name} {/* Используем name вместо description */}
                                </Typography>
                                <Typography variant="small" color="gray">
                                    {new Date(date).toLocaleDateString()}
                                </Typography>
                            </div>

                            <div className="flex items-center gap-4">
                                <Typography variant="h6" color="blue" className="font-semibold">
                                    {parseFloat(price).toLocaleString()} UZS {/* Используем price вместо amount */}
                                </Typography>
                                <IconButton onClick={() => {
                                    setEditData({ id, name, price, date });
                                    setEditModal(true)
                                }} variant="text" color="blue">
                                    <PencilIcon className="h-5 w-5" />
                                </IconButton>
                                <IconButton onClick={() => {
                                    setDeleteData(id);
                                    setDeleteModal(true)
                                }} variant="text" color="red">
                                    <TrashIcon className="h-5 w-5" />
                                </IconButton>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
            <DeleteExpenses isOpen={deleteModal} onClose={() => setDeleteModal(false)} refresh={getExpenses} id={deleteData} />
            <EditExpenses isOpen={editModal} onClose={() => setEditModal(false)} refresh={getExpenses} data={editData} />
        </div>
    );
}