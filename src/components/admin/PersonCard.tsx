import { motion } from 'framer-motion';
import { Edit, Trash2, Calendar, User } from 'lucide-react';
import { Gender, type Person } from '@/types/admin';

interface PersonCardProps {
    person: Person;
    onEdit: (person: Person) => void;
    onDelete: (person: Person) => void;
}

export default function PersonCard({ person, onEdit, onDelete }: PersonCardProps) {
    const getGenderText = (gender: Gender) => {
        switch (gender) {
            case Gender.MALE: return 'Nam';
            case Gender.FEMALE: return 'Nữ';
            default: return 'Khác';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors"
        >
            {/* Avatar */}
            <div className="aspect-square bg-zinc-800 flex items-center justify-center">
                {person.avatar ? (
                    <img
                        src={person.avatar}
                        alt={person.fullName}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <User size={48} className="text-zinc-600" />
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <h3 className="font-medium text-white mb-1">{person.fullName}</h3>
                        {person.otherName && (
                            <p className="text-sm text-zinc-400 mb-1">({person.otherName})</p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-zinc-500">
                            <span>{getGenderText(person.gender)}</span>
                            <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {formatDate(person.dateOfBirth)}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <motion.button
                            onClick={() => onEdit(person)}
                            className="p-1.5 text-zinc-400 hover:text-blue-500 hover:bg-blue-500/10 rounded transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Edit size={16} />
                        </motion.button>
                        <motion.button
                            onClick={() => onDelete(person)}
                            className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Trash2 size={16} />
                        </motion.button>
                    </div>
                </div>

                {/* Bio */}
                {person.shortBio && (
                    <p className="text-sm text-zinc-400 line-clamp-2">{person.shortBio}</p>
                )}
            </div>
        </motion.div>
    );
}