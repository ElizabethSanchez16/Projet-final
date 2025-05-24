"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UsersForm() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const [passwordResetStatuses, setPasswordResetStatuses] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/EditUser', { // Correction de la route
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
        // Initialiser l'état de réinitialisation du mot de passe
        const initialStatuses = {};
        data.forEach(user => {
          initialStatuses[user.id] = false; // Initialiser à false
        });
        setPasswordResetStatuses(initialStatuses);

      } catch (err) {
        setError(err.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
        const username = localStorage.getItem('username');
        if (!username) {
          router.push('/');
        }
    fetchUsers();
  }, [router]);

  const handleUpdateAdminStatus = async (userId, isAdmin) => {
    try {
      const response = await fetch(`/api/EditUser/${userId}`, { // Correction de la route
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isAdmin }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update admin status: ${response.status}`);
      }

      // Mettre à jour l'état local
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, admin: isAdmin } : user
        )
      );
    } catch (err) {
      setError(err.message || 'Failed to update admin status');
    }
  };

  const handleResetPassword = async (userId) => {
    try {
      const response = await fetch(`/api/EditUser/${userId}/Reset-password`, { // Correction de la route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to reset password: ${response.status}`);
      }
        const data = await response.json();
        alert(data.message);
        // Mettre à jour l'état local pour changer le texte du bouton
        setPasswordResetStatuses(prevStatuses => ({
          ...prevStatuses,
          [userId]: true,
        }));

    } catch (err) {
      setError(err.message || 'Failed to reset password');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/EditUser/${userId}`, { // Correction de la route
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.status}`);
      }

      // Mettre à jour l'état local
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (err) {
      setError(err.message || 'Failed to delete user');
    }
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-4">
      <h1>Gestion des comptes utilisateurs</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.admin ? 'Yes' : 'No'}</td>
              <td>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => handleUpdateAdminStatus(user.id, !user.admin)}
                >
                  {user.admin ? 'Remove Admin' : 'Make Admin'}
                </button>
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => handleResetPassword(user.id)}
                  disabled={passwordResetStatuses[user.id]}
                >
                  {passwordResetStatuses[user.id] ? 'Réinitialisé' : 'Reset Password'}
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}