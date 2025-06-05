import { doc, setDoc, getDoc } from '@firebase/firestore'
import { db } from '../firebase'

export interface IGoalsProps {
 id: string
 meta_year: {
  year: number;
  month: number;
 }
 meta_value_to_year: number
 meta_investimentos: number
 meta_renda_fixa: number
 meta_reserva: number
}

export async function getGoals(idUser: string): Promise<IGoalsProps> {
 // Usar o mesmo padrão dos outros serviços
 const docRef = doc(db, 'users', idUser, 'finance', 'goals')
 const docSnap = await getDoc(docRef)

 // Se o documento existe, retorna seus dados
 if (docSnap.exists()) {
  return {
   id: docRef.id,
   ...(docSnap.data() as any)
  } as IGoalsProps
 }
 // Se não encontrou o documento, retorna um objeto com valores padrão
 const hoje = new Date()
 return {
  id: '',
  meta_year: {
   year: hoje.getFullYear(),
   month: hoje.getMonth()
  },
  meta_value_to_year: 0,
  meta_investimentos: 0,
  meta_renda_fixa: 0,
  meta_reserva: 0
 }
}

export interface ISaveGoalProps {
 id?: string
 meta_year: {
  year: number;
  month: number;
 }
 meta_value_to_year: number
 meta_investimentos: number
 meta_renda_fixa: number
 meta_reserva: number
}

export async function saveGoal(data: ISaveGoalProps, idUser: string) {
 // Sempre usamos o mesmo documento para as metas
 const docRef = doc(db, 'users', idUser, 'finance', 'goals')

 // Criamos um novo objeto sem o campo ID
 const dataToSave = {
  meta_year: data.meta_year,
  meta_value_to_year: data.meta_value_to_year,
  meta_investimentos: data.meta_investimentos,
  meta_renda_fixa: data.meta_renda_fixa,
  meta_reserva: data.meta_reserva
 }

 try {
  // Salva os dados, mesclando com quaisquer dados existentes
  await setDoc(docRef, dataToSave, { merge: true })
  return docRef.id
 } catch (error) {
  console.error('Erro ao salvar meta:', error)
  throw error
 }
}