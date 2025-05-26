//app\(admin)\gestion\GestionForm.js
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UsersForm from './UsersForm';
import AjoutMusiqueForm from "./AjoutMusiqueForm";
import ModificationMusiqueForm from "./ModificationMusiqueForm";

export default function GestionForm() {
    const [selectedOption, setSelectedOption] = useState('');
    const router = useRouter();

    useEffect(() => {
        const username = localStorage.getItem('username');
        if (!username) {
            router.push('/');
        }
    }, [router]);


    const renderOptionContent = () => {
        switch (selectedOption) {
            case 'users':
                return (
                    <div>
                        <UsersForm />
                    </div>
                );
            case 'creatures':
                return (
                    <div>
                        <ModificationMusiqueForm />
                    </div>
                );
            case 'ajout':
                return (
                    <div>
                        <AjoutMusiqueForm />
                    </div>
                );
            default:
                return (
                    <div className="gestion-header">
                        <h1 className="gestion-title">Page de gestion</h1>
                        <p className="gestion-description">Bienvenue sur la page de gestion. Veuillez choisir une option dans la liste déroulante ci-dessous.</p>
                    </div>
                );
        }
    };

    return (
        <div className="gestion-select-container">
            <div className="container mt-4">
                <div className="mb-3">
                    <label htmlFor="options" className="gestion-select-label">Choisir une option:</label>
                    <select
                        className="gestion-select"
                        id="options"
                        onChange={(e) => setSelectedOption(e.target.value)}
                        value={selectedOption}
                    >
                        <option value="">Sélectionner une option</option>
                        <option value="users">1. Gestion des comptes utilisateurs</option>
                        <option value="creatures">2. Modification de vinyls</option>
                        <option value="ajout">3. Ajout de vinyls</option>
                    </select>
                </div >
                <div className="gestion-content">
                    {renderOptionContent()}
                </div >
            </div>
        </div>
    );
}
