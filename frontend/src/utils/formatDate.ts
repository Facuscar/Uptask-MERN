export const formatDate = (date: any) => {
    const formattedDate = date.split('T')[0].split('-');
    
    const newDate = new Date(formattedDate);

    return newDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}
    